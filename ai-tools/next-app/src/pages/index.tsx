// Generate the homepage that has a gradient background from purple via pink to orange
// In the middle of the page you should display a big heading that reads "AI Devtools".
// Below that a button and a card with fun facts about pandas. The button toggles the visibility of the card.
// the card should be visible by default, but not visible when the button is clicked
// the button text should change based on the state of the text
// style the component in white and a slate blue color
// use tailwind for styling
// add typescript types to the component

const IndexPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="h-full w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold text-white">
          AI <span className="text-blue-500">Devtools</span>
        </h1>
        <p className="mt-4 text-2xl text-white">
          A collection of tools for AI developers
        </p>
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Toggle
        </button>
        <div className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white">
          <p className="mt-4 text-2xl text-white">Pandas</p>
          <p className="mt-4 text-2xl text-white">Pandas are cute</p>
          <p className="mt-4 text-2xl text-white">Pandas are black and white</p>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
