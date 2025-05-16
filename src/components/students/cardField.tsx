import { ChangeEvent } from "react";

export default function CardField({
    id = "name",
    title = "Enter Name",
    isRequired = true,
    fieldType = "text",
    isTextHolder = true,
    textHolder = "Enter your name",
    fieldValue,
    onChangeFunc,
}: {
    id?: string,
    title?: string,
    isRequired?: boolean,
    fieldType?: string,
    isTextHolder?: boolean,
    textHolder?: string,
    fieldValue: string,
    onChangeFunc: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) {
    return (
        <>
            {isTextHolder ?
                <div>
                    <label htmlFor={id} className="text-black">{title}{isRequired && "*"}</label>
                    <input
                        type={fieldType}
                        name={id}
                        id={id}
                        placeholder={textHolder}
                        value={fieldValue}
                        onChange={(e) => onChangeFunc(e)}
                        className="mx-2 border-2 rounded-md px-1 text-black"
                        required={isRequired}
                    />
                </div>
                :
                <div>
                    <label htmlFor={id} className="text-black">{title}{isRequired && "*"}</label>
                    <input
                        type={fieldType}
                        name={id}
                        id={id}
                        value={fieldValue}
                        onChange={(e) => onChangeFunc(e)}
                        className="mx-2 border-2 rounded-md px-1 text-black"
                        required={isRequired}
                    />
                </div>
            }
        </>
    );
};