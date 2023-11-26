interface IForm {
    formId: number;
    criterias: {
        criteriaId: number;
        subCriterias: {
            subCriteria: {
                subCriteriaId: number;
            },
            A: number;
            B: number;
            C: number;
        }[]
    }[]
}

interface IFlattedForm {
    formId: number; // key
    subCriterias: {
        subCriteriaId: number;
        A: number;
        B: number;
        C: number;
    }[]
}

const forms: IForm[] = [
    {
        formId: 1,
        criterias: [
            {
                criteriaId: 1,
                subCriterias: [
                    {
                        subCriteria: {
                            subCriteriaId: 1
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 2
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 3
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                ]
            },
            {
                criteriaId: 2,
                subCriterias: [
                    {
                        subCriteria: {
                            subCriteriaId: 4
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 5
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 6
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                ]
            },
            {
                criteriaId: 3,
                subCriterias: [
                    {
                        subCriteria: {
                            subCriteriaId: 7
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 8
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 9
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                ]
            }
        ]
    },
    {
        formId: 2,
        criterias: [
            {
                criteriaId: 1,
                subCriterias: [
                    {
                        subCriteria: {
                            subCriteriaId: 1
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 2
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 3
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                ]
            },
            {
                criteriaId: 2,
                subCriterias: [
                    {
                        subCriteria: {
                            subCriteriaId: 4
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 5
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 6
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                ]
            },
            {
                criteriaId: 3,
                subCriterias: [
                    {
                        subCriteria: {
                            subCriteriaId: 7
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 8
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                    {
                        subCriteria: {
                            subCriteriaId: 9
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                    },
                ]
            }
        ]
    }
]

const res: IFlattedForm[] = forms.reduce((arr, form) => {
    const addedFlattedForm = form.criterias.map(criterias => {
        const mappedCriterias = criterias.subCriterias.map(subCriteria => ({
            subCriteriaId: subCriteria.subCriteria.subCriteriaId,
            A: subCriteria.A,
            B: subCriteria.B,
            C: subCriteria.C,
        }));

        return ({
            formId: form.formId,
            criterias: mappedCriterias
        })
    });

    arr = [...arr, ...addedFlattedForm];

    return arr;
}, []);


export default function Flat() {
    
console.log(res);
    return (
        <></>
    )
}