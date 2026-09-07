// Classifies a free-text relationship (whatever the user types -- "my
// husband", "mom", "best friend") into a priority tier, so contacts get
// an escalation order automatically instead of asking the user to rank
// them manually.
//
// "In the absence of one tier, the next falls in line" isn't special
// logic -- it falls out for free from sorting the contact list by
// `priority` ascending and walking it top to bottom. If there's no
// Spouse-tier contact, the sorted list simply starts at whichever tier
// does have one.

const PRIORITY_TIERS = [
  {
    priority: 1,
    label: "Spouse",
    keywords: [
      "spouse", "husband", "wife", "fiance", "fiancee", "fiancé", "fiancée",
      "partner", "boyfriend", "girlfriend",
    ],
  },
  {
    priority: 2,
    label: "Parent/Guardian",
    keywords: [
      "mother", "mom", "mommy", "father", "dad", "daddy", "parent", "guardian",
    ],
  },
  {
    priority: 3,
    label: "Friend",
    keywords: ["friend", "bestie", "roommate", "coursemate", "classmate"],
  },
  {
    priority: 4,
    label: "Campus/School",
    keywords: [
      "campus", "security", "school", "hostel", "warden", "lecturer", "dean", "porter",
    ],
  },
];

// Deliberate catch-all: an unrecognized relationship still gets added and
// still gets contacted, just last in line, rather than being dropped or
// causing an error.
const OTHER_TIER = { priority: 5, label: "Other" };

export function classifyRelationship(relationshipText) {
  const normalized = (relationshipText || "").toLowerCase().trim();

  for (const tier of PRIORITY_TIERS) {
    if (tier.keywords.some((keyword) => normalized.includes(keyword))) {
      return { priority: tier.priority, label: tier.label };
    }
  }

  return { priority: OTHER_TIER.priority, label: OTHER_TIER.label };
}

// Reverse lookup for display -- turns a stored priority number back into
// a readable tier label when rendering the contact list.
export function priorityLabel(priority) {
  const tier = PRIORITY_TIERS.find((t) => t.priority === priority);
  return tier ? tier.label : OTHER_TIER.label;
}