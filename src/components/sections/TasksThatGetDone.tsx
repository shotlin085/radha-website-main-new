import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TaskListCard } from "@/components/ui/TaskListCard";
import { frameSrc, SEQUENCES } from "@/lib/sequences";

const SEQUENCE = SEQUENCES["03-retail-operations"];

// Chapter 6 of 8 — second half of the GRN/Tasks duo. Motion: list items
// stagger in and status chips pop — both live inside TaskListCard itself,
// reusable anywhere the card appears.
export function TasksThatGetDone() {
  return (
    <section id="tasks-done" aria-labelledby="tasks-done-heading" className="bg-surface pt-10 pb-20 tablet:pb-28">
      <Container className="grid items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline">
            <Image
              src={frameSrc("03-retail-operations", 240)}
              alt="A store worker checking a task list on a phone in the aisle"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
              style={{ objectPosition: `${SEQUENCE.focalX * 100}% 50%` }}
            />
          </div>
        </div>

        <div>
          <SectionHeading
            id="tasks-done-heading"
            eyebrow="Tasks That Get Done"
            title="Your team, aligned and accountable."
            description="Assign tasks, track progress, get it done."
          />
          <div className="mt-8">
            <TaskListCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
