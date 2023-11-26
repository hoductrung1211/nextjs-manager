'use client';
export default function Page() {
  return (
    <div className="flex bg-gray-50">
      <aside className="sticky flex flex-col gap-5 left-0 top-0 w-80 h-screen bg-gray-100 border-r-2">
        <a className="h-14 bg-slate-300" href="#1">1</a>
        <a className="h-14 bg-slate-300"  href="#2">2</a>
        <a className="h-14 bg-slate-300"  href="#3">3</a>
        <a className="h-14 bg-slate-300"  href="#4">4</a>
      </aside>
      <main className="top-0 w-full flex flex-col ">
        <header className="top-0 h-20 bg-gray-100 border-b"></header>
        <main className="flex flex-col gap-5">
          <section className="px-5 flex flex-col">
            <header className="sticky top-0 h-20 bg-gray-200 border-2 border-gray-400">
              Header 1
            </header>
            <main className="h-[2000px] bg-gray-100" id="1"></main>
          </section>
          <section className="px-5 flex flex-col">
            <header className="sticky top-0 h-20 bg-gray-300 border-2 border-gray-400">
              Header 2
            </header>
            <main className="h-[2000px] bg-gray-100" id="2"></main>
          </section>
          <section className="px-5 flex flex-col">
            <header className="sticky top-0 h-20 bg-gray-200 border-2 border-gray-400">
              Header 3
            </header>
            <main className="h-[2000px] bg-gray-100" id="3"></main>
          </section>
          <section className="px-5 flex flex-col">
            <header className="sticky top-0 h-20 bg-[#E5E7EB] border-2 border-gray-400">
              Header 4
            </header>
            <main className="h-[2000px] bg-gray-100" id="4"></main>
          </section>
        </main>
      </main>
    </div>
  )
}