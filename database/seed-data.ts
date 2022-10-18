interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, sequi.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ducimus a consectetur possimus veniam dolorum cum voluptas quis, pariatur eos commodi voluptates. Facilis minima voluptate itaque aut doloremque reprehenderit tenetur?",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, sequi. 5123123123",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
