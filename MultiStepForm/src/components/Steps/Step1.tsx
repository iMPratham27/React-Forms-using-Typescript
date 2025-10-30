import { TextFieldCustom } from "../TextFieldCustom";

export default function Step1(){
    return (
        <div className="space-y-4">
            <TextFieldCustom label="First Name" name="firstName" />
            <TextFieldCustom label="Last Name" name="lastName" />
        </div>
    );
}