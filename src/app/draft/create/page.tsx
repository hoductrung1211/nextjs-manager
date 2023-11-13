import { Toolbar, Typography } from "@mui/material";

export default function Page() {
    return (
        <div className="w-full h-screen p-5 bg-gray-100">
            <main className='h-full flex flex-col rounded-lg overflow-hidden bg-default'>
                <Toolbar
                    className="px-5"
                >
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                    Create Recruitment Plans
                    </Typography>
                </Toolbar>
                <div className="h-full flex flex-col gap-10 bg-white overflow-y-auto">
                    <section className="p-5  flex justify-between">
                        <div className="">
                            <h6>Details</h6>
                            <p>Title, short description, image...</p>
                        </div>
                        <div className="w-220 p-5 flex flex-col gap-5 h-100 rounded-lg shadow-md">
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                        </div>
                    </section>
                    <section className="p-5  flex justify-between">
                        <div className="">
                            <h6>Details</h6>
                            <p>Title, short description, image...</p>
                        </div>
                        <div className="w-220 p-5 flex flex-col gap-5 h-100 rounded-lg shadow-md">
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                        </div>
                    </section>
                    <section className="p-5  flex justify-between">
                        <div className="">
                            <h6>Details</h6>
                            <p>Title, short description, image...</p>
                        </div>
                        <div className="w-220 p-5 flex flex-col gap-5 h-100 rounded-lg shadow-md">
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                            <div className="h-20 rounded-md border"></div>
                        </div>
                    </section> 
                </div>
            </main>
        </div>
    )
}