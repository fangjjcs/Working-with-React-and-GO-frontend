import { useEffect } from "react"

const Page1 = (props) => {

    useEffect(() => {
        const route = window.location.hash.split("#")[1]
        props.getHeader(route)
    }, [])

    return (
        <div>
            <header>
                <div>{props.title}</div>
            </header>
        </div>
    )
}

export default Page1;