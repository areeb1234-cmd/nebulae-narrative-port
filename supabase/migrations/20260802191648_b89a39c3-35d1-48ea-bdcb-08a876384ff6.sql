-- Server-side validation via trigger functions
CREATE OR REPLACE FUNCTION public.validate_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.full_name := btrim(NEW.full_name);
  NEW.email := lower(btrim(NEW.email));
  NEW.phone := btrim(NEW.phone);
  NEW.service := btrim(NEW.service);
  NEW.message := NULLIF(btrim(COALESCE(NEW.message, '')), '');

  IF char_length(NEW.full_name) < 1 OR char_length(NEW.full_name) > 100 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF char_length(NEW.email) > 255 OR NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF char_length(NEW.phone) < 5 OR char_length(NEW.phone) > 20 OR NEW.phone !~ '^[0-9+()\-\s]+$' THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;
  IF char_length(NEW.service) < 1 OR char_length(NEW.service) > 100 THEN
    RAISE EXCEPTION 'Invalid service';
  END IF;
  IF NEW.message IS NOT NULL AND char_length(NEW.message) > 1000 THEN
    RAISE EXCEPTION 'Message too long';
  END IF;
  IF NEW.booking_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Booking date must not be in the past';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.name := btrim(NEW.name);
  NEW.email := lower(btrim(NEW.email));
  NEW.subject := btrim(NEW.subject);
  NEW.message := btrim(NEW.message);

  IF char_length(NEW.name) < 1 OR char_length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF char_length(NEW.email) > 255 OR NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF char_length(NEW.subject) < 1 OR char_length(NEW.subject) > 200 THEN
    RAISE EXCEPTION 'Invalid subject';
  END IF;
  IF char_length(NEW.message) < 1 OR char_length(NEW.message) > 2000 THEN
    RAISE EXCEPTION 'Invalid message';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_booking_before_insert ON public.bookings;
CREATE TRIGGER validate_booking_before_insert
  BEFORE INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.validate_booking();

DROP TRIGGER IF EXISTS validate_contact_before_insert ON public.contact_submissions;
CREATE TRIGGER validate_contact_before_insert
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.validate_contact_submission();

-- Replace always-true INSERT policies with constrained ones
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Visitors can create valid bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 1 AND 100
  AND char_length(btrim(email)) <= 255
  AND btrim(email) ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(phone)) BETWEEN 5 AND 20
  AND char_length(btrim(service)) BETWEEN 1 AND 100
  AND (message IS NULL OR char_length(message) <= 1000)
  AND booking_date >= CURRENT_DATE
);

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Visitors can submit valid contact messages"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(btrim(email)) <= 255
  AND btrim(email) ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(subject)) BETWEEN 1 AND 200
  AND char_length(btrim(message)) BETWEEN 1 AND 2000
);

GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.bookings TO service_role;
GRANT ALL ON public.contact_submissions TO service_role;