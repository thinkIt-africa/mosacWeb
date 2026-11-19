import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-midnight py-28 text-white md:py-40">
      <div className="container-site">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display mt-4 text-6xl md:text-8xl">
          Wrong turn?
          <br />
          <span className="text-red">Let’s get you back on track.</span>
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/events" variant="outline-light">
            Events
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
