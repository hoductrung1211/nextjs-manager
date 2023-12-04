import Icon from "@/components/Icon";
import { Button, Typography } from "@mui/material";

interface JobRequisitionDetailProps {

}

export default function JobRequisitionDetail({

}: JobRequisitionDetailProps) {
    return (
        <div className="pt-4 pl-8 pr-2 pb-10 flex flex-col gap-4 rounded-md bg-white shadow-sm group transition-all">
            <section className="flex justify-between items-center">
                <Typography variant="h6">Job Requisition</Typography>
                <Button className="text-dark group-hover:opacity-100 opacity-0 ">
                    <Icon name="pen-to-square text-dark" size="lg" />
                </Button>
            </section>
            <section className="grid grid-cols-4 gap-6">
                <p className="font-semibold col-span-1 text-end">Position Title</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Department</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Number Of Position</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Start Date</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Job Justification</p>
                <p className="col-span-3">1</p>
                    
            </section>
        </div>
    )
}