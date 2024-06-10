import React from 'react'
import { Vortex } from 'react-loader-spinner'

const Loader2 = () => {
    return (
        <>
            <Vortex
                visible={true}
                height="50"
                width="50"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </>
    )
}

export default Loader2


