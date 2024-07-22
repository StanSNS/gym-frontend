import {termsAndConditions} from "../../Resources/TermsAndConditions/termsAndConditions";
import './TermsAndConditions.css'

export default function TermsAndConditions() {
    return (
        <div className="termsAndCondsSection">
            <h1 className="termsAndCondsTitle">{termsAndConditions.title}</h1>
            {termsAndConditions.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <h2>{section.section}</h2>
                    <ul>
                        {section.rules.map((rule) => (
                            <li key={rule.id}>
                                <strong>{rule.id}</strong>: {rule.text}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}