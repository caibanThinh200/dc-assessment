import { motion } from "motion/react"
import LoadingSpinner from "./loading"
import { LoadingIcon } from "./icons"

const LoadingOverlay = () => {
    return <motion.div className="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#3F3D56] rounded-full size-[200vw] grid place-items-center"
        initial={{
            scale: 0
        }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, repeat: 1, repeatType: "reverse", repeatDelay: 1 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col gap-5 items-center">
            <LoadingIcon />
            <p className="text-white">Loading...</p>
        </motion.div>
    </motion.div>
}

export default LoadingOverlay