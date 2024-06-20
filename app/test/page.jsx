import Link from "next/link";
import Style from "/styles/test.module.css";

export default function Test(){
    return (
        <div className={Style.test}>
            <Link href={'/'} >тебе нельзя здесь быть, а ну кыщь</Link>
        </div>
    )
}