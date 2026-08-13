"use client";

import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/ui/animated-cards-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Alex Johnson",
    profession: "CEO at TechStart",
    rating: 5,
    description:
      "Ishu delivered our SaaS platform ahead of schedule. His understanding of full-stack architecture and UI design is exceptional.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "testimonial-2",
    name: "Sarah Williams",
    profession: "Product Manager",
    rating: 4.5,
    description:
      "The AI integration he built saved us hundreds of hours. A true professional who understands both code and business needs.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "testimonial-3",
    name: "Michael Chen",
    profession: "Founder, LearnAI",
    rating: 5,
    description:
      "One of the best freelance developers I've worked with. The code quality and responsiveness of the application are world-class.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "testimonial-4",
    name: "Jessica H.",
    profession: "Web Designer",
    rating: 4.5,
    description:
      "The attention to detail and user experience in their work is exceptional. I'm thoroughly impressed with the final product.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-black/40 border-y border-white/5 px-4 sm:px-8 py-12 md:py-16 overflow-x-clip"
    >
      <div className="container mx-auto">
        <h2 className="text-center text-3xl md:text-5xl font-bold">
          Client <span className="text-gradient">Testimonials</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
          What clients say about working together on products, platforms, and AI-powered experiences.
        </p>
      </div>

      <ContainerScroll className="container h-[220vh] sm:h-[260vh] md:h-[300vh]">
        <div className="sticky left-0 top-0 h-svh w-full py-10 sm:py-12 flex items-center">
          <CardsContainer className="mx-auto size-full h-[400px] w-[min(100%,350px)] sm:h-[450px] sm:w-[350px]">
            {TESTIMONIALS.map((testimonial, index) => (
              <CardTransformed
                arrayLength={TESTIMONIALS.length}
                key={testimonial.id}
                variant="dark"
                index={index + 2}
                role="article"
                aria-labelledby={`card-${testimonial.id}-title`}
                aria-describedby={`card-${testimonial.id}-content`}
                className="border-white/10 bg-[#0a0a0f]/90 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars
                    className="text-primary"
                    rating={testimonial.rating}
                  />
                  <div
                    id={`card-${testimonial.id}-content`}
                    className="mx-auto w-4/5 text-base sm:text-lg text-white/90"
                  >
                    <blockquote cite="#">{testimonial.description}</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="!size-12 border border-white/20">
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <span
                      id={`card-${testimonial.id}-title`}
                      className="block text-lg font-semibold tracking-tight md:text-xl"
                    >
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {testimonial.profession}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  );
};
