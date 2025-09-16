// lib/newsApi.js
// In-memory news data and a helper that simulates network latency.

export const newsData = [
  {
    id: '1',
    title: 'Everyone Needs a Special Sit Spot in Nature',
    img: 'https://picsum.photos/seed/nature1/800/450',
    author: 'Jane Doe',
    date: '2020-11-04',
    desc: "Short preview: Nature calms the mind.",
    longerDesc:
      'Longer description: Spending time outdoors has proven benefits for mental health and creativity. This article explores how to create a ritual of visiting a sit spot and what to expect over weeks of practice.',
    topic: 'Nature'
  },
  {
    id: '2',
    title: 'Nature makes you better',
    img: 'https://picsum.photos/seed/nature2/800/450',
    author: 'National Geographic',
    date: '2020-02-13',
    desc: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to fi`,
    longerDesc:
      `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...`,
    topic: 'Nature'
  },
    {
    id: '2',
    title: 'Nature makes you better',
    img: 'https://picsum.photos/seed/nature2/800/450',
    author: 'National Geographic',
    date: '2020-02-13',
    desc: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to fi`,
    longerDesc:
      `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...`,
    topic: 'Nature'
  },
    {
    id: '1',
    title: 'Everyone Needs a Special Sit Spot in Nature',
    img: 'https://picsum.photos/seed/nature1/800/450',
    author: 'Jane Doe',
    date: '2020-11-04',
    desc: "Short preview: Nature calms the mind.",
    longerDesc:
      'Longer description: Spending time outdoors has proven benefits for mental health and creativity. This article explores how to create a ritual of visiting a sit spot and what to expect over weeks of practice.',
    topic: 'Nature'
  },
  {
    id: '2',
    title: 'Nature makes you better',
    img: 'https://picsum.photos/seed/nature2/800/450',
    author: 'National Geographic',
    date: '2020-02-13',
    desc: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to fiEver since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to fi`,
    longerDesc:
      `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...`,
    topic: 'Nature'
  },
    {
    id: '2',
    title: 'Nature makes you better',
    img: 'https://picsum.photos/seed/nature2/800/450',
    author: 'National Geographic',
    date: '2020-02-13',
    desc: `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to fi`,
    longerDesc:
      `Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...`,
    topic: 'Nature'
  },
    {
    id: '1',
    title: 'Everyone Needs a Special Sit Spot in Nature',
    img: 'https://picsum.photos/seed/nature1/800/450',
    author: 'Jane Doe',
    date: '2020-11-04',
    desc: "Short preview: Nature calms the mind.",
    longerDesc:
      'Longer description: Spending time outdoors has proven benefits for mental health and creativity. This article explores how to create a ritual of visiting a sit spot and what to expect over weeks of practice.',
    topic: 'Nature'
  },
  {
    id: '3',
    title: 'Grand Tetons Renew Historic Crest Trail',
    img: 'https://picsum.photos/seed/mountain1/800/450',
    author: 'Parks Traveler',
    date: '2020-10-23',
    desc: "Trail reopened after conservation work.",
    longerDesc:
      'This piece covers the restoration project and why the trail is important for local wildlife and tourism.',
    topic: 'Travel'
  },
  {
    id: '4',
    title: 'Tech: AI in Everyday Tools',
    img: 'https://picsum.photos/seed/tech1/800/450',
    author: 'Tech Today',
    date: '2024-03-01',
    desc: 'How AI is embedded into common apps.',
    longerDesc: 'AI is changing workflows. In this feature, we demo practical uses and pitfalls.',
    topic: 'Technology'
  }
];

/**
 * getNews(topic)
 * - topic: string (can be empty/null to return everything)
 * Returns a Promise that resolves after 1.5 seconds with matching news items.
 */
export async function getNews(topic) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!topic) {
        resolve(newsData.slice()); // return copy
        return;
      }

      const lowerTopic = topic.toLowerCase();
      const filtered = newsData.filter((item) => {
        return (
          item.topic.toLowerCase().includes(lowerTopic) ||
          (item.title && item.title.toLowerCase().includes(lowerTopic)) ||
          (item.desc && item.desc.toLowerCase().includes(lowerTopic)) ||
          (item.longerDesc && item.longerDesc.toLowerCase().includes(lowerTopic))
        );
      });

      resolve(filtered);
    }, 1500);
  });
}
