import Link from "next/link";

export default function profile({ params }){
    return (
        <div>
            профиль пользователя {params.steamid}
        </div>
    )
}