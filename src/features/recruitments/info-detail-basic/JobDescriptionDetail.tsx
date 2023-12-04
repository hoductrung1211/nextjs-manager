import Icon from "@/components/Icon";
import { Button, Typography } from "@mui/material";

interface JobDescriptionDetailProps {

}

export default function JobDescriptionDetail({

}: JobDescriptionDetailProps) {
    return (
        <div className="pt-4 pl-8 pr-2 pb-10 flex flex-col gap-4 rounded-md bg-white shadow-sm group">
            <section className="flex justify-between items-center">
                <Typography variant="h6">Job Description</Typography>
                <Button className="text-dark group-hover:opacity-100 opacity-0">
                    <Icon name="pen-to-square text-dark" size="lg" />
                </Button>
            </section>
            <section className="grid grid-cols-4 gap-6">
                <p className="font-semibold col-span-1 text-end">Qualification</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Contract Type</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Employee Role</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Experience</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Work Site</p>
                <p className="col-span-3">1</p>

                <p className="font-semibold col-span-1 text-end">Salary</p>
                <p className="col-span-3">11.000.000 - 12.000.000</p> 
            </section>
        </div>
    )
}