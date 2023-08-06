import { useEffect, useState } from "react";

const Streak = ({ success, datesInRange, streak, listIndex, date, index, markedStreaks }) => {
    const [colorPaletCount, setColorPaletCount] = useState(0);

    const handleColor = (e, listIndex, index) => {
        console.log("hit")
        const colorPalet = ['#9be9a8', '#40c463', '#30a14e', '#216e39', 'unset'];
        success(e, listIndex, index, colorPalet[colorPaletCount % colorPalet.length]);
        setColorPaletCount(colorPaletCount + 1);
    }

    const markedOption = markedStreaks.find(streak => streak.id === `${listIndex}-${index}`)

    useEffect(() => { }, [colorPaletCount])

    return (
        <>
            <td key={date.getDate()} >
                <div
                    ref={(element => (streak.current[listIndex][index] = element))}
                    data-id={`${listIndex}-${index}`}
                    onClick={(e) => handleColor(e, listIndex, index)}
                    className={`marker ${markedOption && markedOption.markedColor}`}>
                </div>
            </td>

        </>

    )
}

export default Streak

