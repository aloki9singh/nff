import * as yup from 'yup';


export const addMentorSchema = yup.object().shape({
    name: yup.string().min(5).required("Name is required"),
    fatherName: yup.string().required("Father's name is required"),
    motherName: yup.string().required("Mother's name is required"),
    primaryEmail: yup.string().email().required("Primary email is required"),
    secondaryEmail: yup.string().email("Secondary email is not valid"),
    primaryPhone: yup.string().required("Primary phone is required"),
    secondaryPhone: yup.string("Secondary phone is not valid"),
    address: yup.string().required("Address is required"),
    uniqueAuthCode: yup.string().required("Unique auth code is required"),
    password: yup.string().required("Password is required"),
    qualification: yup.string().required("Qualification is required"),
    skill1: yup.string().required("Skill is required"),
    skill2: yup.string().required("Skill is required"),
    skill3: yup.string().required("Skill is required"),
    skill4: yup.string().required("Skill is required"),
});