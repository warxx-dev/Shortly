import { motion } from "framer-motion"

const FullNameInput = () => {
    return (
        <motion.div
        initial={{y: "20px", opacity: 0}}
            animate={{y: "0", opacity: 1}}
            exit={{y: "20px", opacity: 0}}
            transition={{duration: 0.4}}>

        </motion.div>
    )
}