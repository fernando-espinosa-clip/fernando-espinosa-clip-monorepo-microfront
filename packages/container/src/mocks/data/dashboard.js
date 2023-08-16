import { getRandomArbitrary } from '../../utils/generatorUtilities';

export const mainData = () => ({
  budget: {
    amount: `${getRandomArbitrary(2400, 35000) / 100} k`,
    comparative: getRandomArbitrary(-50, 50),
  },
  totalCostumers: {
    amount: `${getRandomArbitrary(-1000, 15000) / 1000} k`,
    comparative: getRandomArbitrary(-50, 50),
  },
  dayProgress: getRandomArbitrary(20, 90),
  totalProfit: getRandomArbitrary(15, 80),
  sales: [
    {
      name: 'This year',
      data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
    },
    {
      name: 'Last year',
      data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
    },
  ],
  trafficSources: [
    { source: 'desktop', amount: 63 },
    { source: 'tablet', amount: 15 },
    { source: 'phone', amount: 22 },
  ],
});
