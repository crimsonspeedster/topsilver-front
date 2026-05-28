import {MenuObject} from "@interfaces/entities/menu";
import MobileMenuItem from "@src/components/Headers/MobileMenuItem";

type Props = {
    menu: MenuObject;
};

const MobileMenu = (
    {
        menu,
    }: Props
) => {
    return (
        <div className="accordion">
            {
                menu.items.map((item, i) => (
                    <MobileMenuItem
                        key={i}
                        item={item}
                    />
                ))
            }
        </div>
    );
}

export default MobileMenu;