'use client'; 

export default function Page() {
    return (
        <div className="h-screen w-full p-5 bg-white">
            <div className="w-full h-full flex flex-col rounded-xl bg-default overflow-hidden">
                <header className="flex-shrink-0 h-14 px-3 flex items-center gap-4 border-b ">
                    <div className="w-12 h-12 rounded-full bg-grey"></div>
                </header>
                <main className=" overflow-y-scroll drop-shadow-sm">
                    <div className=" ">
                    </div>
                </main>
            </div>
        </div>
    )
}