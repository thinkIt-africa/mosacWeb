import { PendingNote } from "./Blocks";
import { PageHero } from "./Heroes";

/** Shell for policy pages whose text is still being drafted and approved (D21). */
export function PolicyPage({ title }: { title: string }) {
  return (
    <>
      <PageHero eyebrow="Information" title={title} />
      <section className="py-16 md:py-24">
        <div className="container-site max-w-3xl! space-y-6">
          <PendingNote />
        </div>
      </section>
    </>
  );
}
