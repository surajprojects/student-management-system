export default function Card({ title = "Name", num = "100", colorName = "fdba74" }) {
    return (
        <>
            {/* Wrapper Container */}
            <div style={{ backgroundColor: `#${colorName}` }} className="p-5 rounded-3xl w-72 border shadow m-4">
                {/* Title Container */}
                <div>
                    <p className="font-semibold text-3xl">{title}</p>
                </div>
                {/* Number Container */}
                <div className="mt-4">
                    <p className="text-3xl">{num}</p>
                </div>
            </div >
        </>
    );
};



