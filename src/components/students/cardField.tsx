export default function CardField({
    id = "name",
    title = "Enter Name",
    isRequired = true,
    fieldType = "text",
    textHolder = "Enter your name",
    fieldValue,
    onChangeFunc,
}: any) {
    return (
        <>
            <div>
                <label htmlFor={id}>{title}{isRequired && "*"}</label>
                <input
                    type={fieldType}
                    name={id}
                    id={id}
                    placeholder={textHolder}
                    value={fieldValue}
                    onChange={(e) => onChangeFunc(e)}
                    className="mx-2 border-2 rounded-md px-1"
                    required={isRequired}
                />
            </div>
        </>
    );
};