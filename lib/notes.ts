import type { Block } from "./content";

export interface RandomNote {
  slug: string;
  title: string;
  date: string;
  text: string;
  content: Block[];
}

export const randomNotes: RandomNote[] = [
  {
    slug: "on-editors",
    title: "On editors",
    date: "2026-03-11",
    text: "The internet made everyone a publisher and almost nobody an editor. The difference matters more than it ever has.",
    content: [
      {
        type: "p",
        text: "Anyone can ship to the whole world now — that part got easy years ago. What almost never happens anymore is a second pair of eyes on a piece of work before it goes out. We publish first and edit in public, which is a polite way of saying the audience does the editing for free.",
      },
      {
        type: "p",
        text: "I am not nostalgic for gatekeepers. But I have started to quietly miss the thing an editor actually did: standing far enough away from your words to see what they really say, not what you meant them to say.",
      },
      {
        type: "quote",
        text: "Publishing used to be a promise. Today it is a default.",
      },
      {
        type: "p",
        text: "So I try to be my own editor, badly, one draft late. It is still the most useful hour of the week.",
      },
    ],
  },
  {
    slug: "on-being-wrong",
    title: "On being wrong",
    date: "2026-02-02",
    text: "I keep a list of things I am wrong about. It grows faster than I would like, which is probably the point of keeping it.",
    content: [
      {
        type: "p",
        text: "The list started with small things — a library I swore was abandoned, a country I was sure was spelled differently, a setup I was certain was best practice. Every entry looked harmless on its own. Together they form a useful warning: my strong opinions all came with a timestamp.",
      },
      {
        type: "p",
        text: "Some people keep a reading list. I keep a wrongness list. It is just a plain file I append to, and it has a rule: an item only counts if I can remember defending it out loud.",
      },
      {
        type: "quote",
        text: "A fact you refuse to check is a belief wearing a lab coat.",
      },
      {
        type: "p",
        text: "The list grows faster than I would like. That is fine. A growing wrongness list means I am actually finding out things, rather than confirming them.",
      },
    ],
  },
  {
    slug: "on-attention",
    title: "On attention",
    date: "2026-01-14",
    text: "Most apps fail not because they are hard to use but because after a week they are boring. Attention is the only battery that matters.",
    content: [
      {
        type: "p",
        text: "We blame bad onboarding, ugly screens, missing features. Usually the truth is duller: the app was interesting once and then stopped being worth ten seconds a day. Nobody designs for week four, and week four is where most products go to die.",
      },
      {
        type: "p",
        text: "Attention is the only battery that matters. Every app I keep using has found a way to earn a tiny recharge each day — a habit, a visible trace of progress, a reason the empty state is not actually empty.",
      },
      {
        type: "quote",
        text: "Retention is not a metric. It is a daily verdict.",
      },
    ],
  },
  {
    slug: "on-writing-things-down",
    title: "On writing things down",
    date: "2025-12-01",
    text: "Writing an idea down is not remembering it. It is deciding that it exists.",
    content: [
      {
        type: "p",
        text: "An unwritten idea is a mood. It feels important, it looms, and it compresses into fog as soon as you try to describe it. The act of writing is what turns the fog into something with edges — and mostly it reveals the idea was never as big as the mood.",
      },
      {
        type: "p",
        text: "That sounds deflating, but it is the point. Writing things down is how I reject ideas cheaply instead of carrying them around for weeks. The ones that survive being written are the ones worth keeping.",
      },
      {
        type: "quote",
        text: "Most ideas do not die in the meeting. They die on the page, quickly, which is where all good ideas should be allowed to die.",
      },
      {
        type: "p",
        text: "So I write nearly everything down, and I am wrong about most of it, and I would not trade the practice for a better memory.",
      },
    ],
  },
  {
    slug: "on-perfectionism",
    title: "On perfectionism",
    date: "2025-10-20",
    text: "Perfectionism is procrastination wearing a suit.",
    content: [
      {
        type: "p",
        text: "The suit is convincing. It looks like standards, like doing things right, like caring. Underneath it is usually the same thing as any other delay: a fear of an outcome we can predict and do not want to meet.",
      },
      {
        type: "p",
        text: "I can name a dozen projects that failed at the highest fidelity possible. They were pixel perfect, architected beautifully, and never once in front of a real user for long enough to learn anything.",
      },
      {
        type: "quote",
        text: "Done, not beautiful. Beautiful is a mood; done is evidence.",
      },
      {
        type: "p",
        text: "I try to catch myself when the polishing starts before the releasing does. The polish is not the work. The work is the number of times something is shipped.",
      },
    ],
  },
  {
    slug: "on-apologies",
    title: "On apologies",
    date: "2025-09-06",
    text: "The best apology I know is a changed schedule.",
    content: [
      {
        type: "p",
        text: "Words make the apology feel finished, which is exactly why it is not. The part that costs something is what you do the following week — where the meeting actually goes, whose deadline moves, what you stop doing so this does not happen again.",
      },
      {
        type: "p",
        text: "I have been late, I have over-promised, I have said sorry and meant it. The difference between the apologies that landed and the ones that did not was never sincerity. It was whether my calendar changed afterwards.",
      },
      {
        type: "quote",
        text: "People forgive the miss. They do not forgive the unchanged plan.",
      },
    ],
  },
  {
    slug: "on-gardens",
    title: "On gardens",
    date: "2025-07-18",
    text: "Nobody hands a shovel to someone who already has a garden.",
    content: [
      {
        type: "p",
        text: "Help arrives in the shape of the helper, not the helpee. A person with a working system gets offers to optimize it. A person without one gets advice about starting small — which is true, and also almost never what a desperate project needs.",
      },
      {
        type: "p",
        text: "I have been on both sides. When I am thriving, people want to improve me. When I am stuck, the same people want to motivate me. Nobody ever hands me a shovel, even when digging is the obvious next step.",
      },
      {
        type: "quote",
        text: "Ask for the shovel. It is the only thing nobody volunteers.",
      },
      {
        type: "p",
        text: "These days, before I offer help I ask what is actually in the way. Sometimes the gardening advice is wanted. Sometimes the person just needs me to dig.",
      },
    ],
  },
  {
    slug: "on-notes",
    title: "On notes",
    date: "2025-05-27",
    text: "I finally understand why people keep resetting their notes app. They are not looking for a better system. They are looking for a clean slate.",
    content: [
      {
        type: "p",
        text: "The cycle is always the same: switch app, import everything, build folders, feel a wave of certainty, then slow leak back into chaos and start scrolling for the next app. The system was never the problem.",
      },
      {
        type: "p",
        text: "A notes app is not a filing cabinet. It is a mirror, and the mirror shows how messy and inconsistent you actually are. Resetting it is not organization — it is brushing your teeth in front of the mirror instead of looking for a new bathroom.",
      },
      {
        type: "quote",
        text: "The clean slate is the product. The app is just the paper towel.",
      },
      {
        type: "p",
        text: "I stopped searching. I keep one file, I keep it ugly, and I write things down in it every day. It is not a better system. It is a practiced one, which turns out to be the only kind that works.",
      },
    ],
  },
];

export function getRandomNote(slug: string): RandomNote | undefined {
  return randomNotes.find((note) => note.slug === slug);
}