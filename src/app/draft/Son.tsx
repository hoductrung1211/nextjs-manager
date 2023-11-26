import { ChangeEvent, useState } from "react";

interface IForm {
    id: number;
    a: number;
    b: number;
    c: number;
}

export default function Son() {
    const [index, setIndex] = useState(0);
    const [forms, setForms] = useState<IForm[]>([
        {
            id: 1,
            a: 7,
            b: 8,
            c: 9,
        },
        {
            id: 2,
            a: 4,
            b: 5,
            c: 6,
        },
        {
            id: 3,
            a: 1,
            b: 2,
            c: 3,
        }
    ]);

    function onClickPrevious(childForm: IForm) {
        setForms([
            ...forms.slice(0, index),
            childForm,
            ...forms.slice(index + 1)
        ]);
        const newIndex = index > 0 ? index - 1 : index;
        setIndex(newIndex);
    }

    function onClickNext(childForm: IForm) {
        setForms([
            ...forms.slice(0, index),
            childForm,
            ...forms.slice(index + 1)
        ]);
        const newIndex = index < forms.length - 1 ? index + 1 : index; 
        setIndex(newIndex);
    }

    function onClickSave() {
        console.log("Save to DB", forms); // Save to DB
    } 

    return (
        <div className="p-10 flex flex-col gap-5">
            <section className="flex gap-10">
                <button onClick={onClickSave}>Save</button>
            </section>
            <section className="">
                <BehaviorForm
                    key={index}
                    form={forms[index]}
                    onClickPrevious={onClickPrevious}
                    onClickNext={onClickNext}
                />
            </section>
        </div>
    )
}
function BehaviorForm({
    form,
    onClickPrevious,
    onClickNext,
}: {
    form: IForm,
    onClickNext: (childForm: IForm) => void;
    onClickPrevious: (childForm: IForm) => void;
}) {
    const [currentForm, setCurrentForm] = useState(form);

    function handleClickPrevious() {
        onClickPrevious(currentForm);
    }

    function handleClickNext() {
        onClickNext(currentForm);
    }

    return (
        <div className="p-4 flex flex-col gap-4 border border-gray-600 rounded-md">
            <section className="flex gap-5">
                <button onClick={handleClickPrevious}>Previous</button>
                <button onClick={handleClickNext}>Next</button>
            </section>
            <div className="bold text-lg">#{form.id}</div>
            <input
                type="number"
                value={currentForm.a}
                onChange={e => setCurrentForm({
                    ...currentForm,
                    a: Number.parseInt(e.target.value)
                })}
            />
            <input
                type="number"
                value={currentForm.b}
                onChange={e => setCurrentForm({
                    ...currentForm,
                    b: Number.parseInt(e.target.value)
                })}
            />
            <input
                type="number"
                value={currentForm.c}
                onChange={e => setCurrentForm({
                    ...currentForm,
                    c: Number.parseInt(e.target.value)
                })}
            />
        </div>
    )
}

