import * as Yup from "yup"
import { useFormik } from "formik";

const validationSchema = Yup.object({
    name: Yup.string().required(),
    lastname: Yup.string().required(),
})

export function useProfileFormik({ name, lastname }, onSubmit, formRef) {
    return useFormik({
        initialValues: { name, lastname },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData(formRef.current)
            formData.append("_method", "PATCH")
            onSubmit(formData)
        },
    })
}