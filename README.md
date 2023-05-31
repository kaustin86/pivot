This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Architectural Overview
- Component\SumOfSales: Where data is pulled from a provided endpoint and processed for the Pivot Table
- Charts\Pivot: Main reusable component.
- Charts\Pivot\Header and Subheader: Houses dimension data, basic column/chart titles and scroll functionality.
- Charts\Pivot\Category and SubCategory: Maps all chart data.
- Charts\Pivot\AggregationRow: Sum of values based on dimensions and data provided

## Simplifications Made:
- Tables for the basic front end structure. This saved a ton of time up front, and was ultimately a performance improvement. 
- Left system scrollbars visible. In any case where the custom scroll action may fail for a user, we'll be able to fall back on the existing system scrollbars. 

## Next Steps:
- Add other calculation methods for the pivot chart component. 
- Bug fix. The scrollbar resizes/sets boundaries incorrectly after resizing the window. 
- Add unit tests with jest. 
- Add finesse for front end. Items such as animating collapsible actions, and a few hover effects. 
    One namely for hovering over data to hightlight the row and column the mouse is over. 
- Add routing to support more charts.
