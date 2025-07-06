import L from 'leaflet';
import commentIcon from '../assets/comment_icon.svg';
import commentOutRangeIcon from '../assets/comment_out_range_icon.svg';

const formatCount = (count: number) => {
    if (count >= 1_000_000) {
        return `${Math.floor(count / 1_000_000)}M`;
    } else if (count >= 1_000) {
        return `${Math.floor(count / 1_000)}k`;
    }
    return count.toString();
};

const CustomDivIcon = (count: number, existInner: boolean): L.DivIcon => {
    const iconSrc = existInner ? commentIcon : commentOutRangeIcon;
    return L.divIcon({
        html: `
        <div style="position: relative">
            <img
                src="${iconSrc}"
            />
            ${
                count > 0
                    ? `<span 
                        style="
                            position: absolute;
                            width: 33px;
                            height: 33px;
                            top: -10.5px;
                            right: -10.5px;
                            background: var(--color-main);
                            color: white;
                            border-radius: 100%;
                            font-family: sans-serif;
                            font-size: 15px;
                            font-weight: bold;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        "
                    >${formatCount(count)}</span>`
                    : ''
            }
        </div>
        `,
        className: '',
        iconSize: [61.563, 53.188],
        iconAnchor: [30.7815, 53.188],
    });
};

export default CustomDivIcon;
