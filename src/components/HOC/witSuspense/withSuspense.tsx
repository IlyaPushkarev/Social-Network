import React, {Suspense} from "react";
import Preloader from "../../common/Preloader/Preloader";

export default function withSuspnse<T>(Component:React.ComponentType<T>) {
    return (props:T)=>(
        <Suspense fallback={<Preloader />}>
            <Component {...props}/>
        </Suspense>
    )
}