import sectionConstants from '../../settings/constants/sectionConstants'
import { FaFilePdf, FaLink, FaVideo } from 'react-icons/fa'
import { ExamIcon } from '../ui/svg/ContentSvgs'

function SectionIcon({ lecture, color = 'orange' }) {
    return (
        <>
            {lecture.sectionType === sectionConstants.VIDEO ? <FaVideo size2rem='1.5rem' color={color} /> :
                lecture.sectionType === sectionConstants.FILE ? <FaFilePdf size='1.5rem' color={color} /> :
                    lecture.sectionType === sectionConstants.EXAM ? <ExamIcon size='1.5rem' color={color} /> :
                        lecture.sectionType === sectionConstants.LINK ? <FaLink size='1.5rem' color={color} /> :
                            lecture.sectionType === sectionConstants.LIVE ? <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} height={'1.5rem'} viewBox="0 0 24 24">
                                <g fill="none" fillRule="evenodd">
                                    <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                                    <path fill={color} d="M16.95 4a1 1 0 0 0-1.414-1.414l-3.89 3.889a.5.5 0 0 1-.707 0L8.464 4A1 1 0 1 0 7.05 5.414L8.636 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5.05zm-7.487 7.92a1.045 1.045 0 0 1 1.458-.842c.355.154 1.028.467 1.868.952s1.449.912 1.76 1.142a1.045 1.045 0 0 1 0 1.683c-.31.229-.914.652-1.76 1.14c-.847.49-1.515.8-1.868.954a1.045 1.045 0 0 1-1.458-.842a19 19 0 0 1-.109-2.094c0-.966.066-1.708.11-2.092"></path>
                                </g>
                            </svg> : sectionConstants.EXERCISE && <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} height={'1.5rem'} viewBox="0 0 48 48">
                                <g fill={color}>
                                    <path d="M20 18.6L17.75 24h4.5z"></path>
                                    <path fillRule="evenodd" d="M38 15L28 4H14a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4zm-18 0a1 1 0 0 1 .923.615l5 12a1 1 0 0 1-1.846.77L23.083 26h-6.166l-.994 2.385a1 1 0 0 1-1.846-.77l5-12A1 1 0 0 1 20 15m-5 17a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zm-1 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1m17-15a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2zM28 7l7 8h-6a1 1 0 0 1-1-1z" clipRule="evenodd"></path>
                                    <path fillRule="evenodd" d="M25.923 27.614v.001q.043.104.062.209a3 3 0 0 1-1.2-.8q-.086.018-.17.053a1 1 0 0 0-.538 1.306L23.083 26h-6.166l-.994 2.384a1 1 0 0 1-1.846-.769l.993-2.384l4.007-9.616a1 1 0 0 1 1.846 0l.923 2.214v.002l2.25 5.4v.001zm-.077-5.384l-3.077-7.384a3 3 0 0 0-5.538 0l-5 12A3 3 0 0 0 12 27.93V8a2 2 0 0 1 2-2h12.268c-.172.298-.268.64-.268 1v7a3 3 0 0 0 3 3h6a2 2 0 0 0 1-.268V25a3 3 0 0 0-3-3a3 3 0 1 0-6 0a3 3 0 0 0-1.154.23m.77 1.847A1 1 0 0 0 27 26h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2a1 1 0 1 0-2 0v2h-2a1 1 0 0 0-.385.077m.884 5.582q.12.18.264.341h-.527q.144-.162.263-.341m-5.27-.505c.134.319.315.602.533.846zm.533.846h-5.526c.218-.244.4-.527.532-.846L18.25 28h3.5l.48 1.154M13.34 30.5A3 3 0 0 1 12 28.067V33c0-1.043.533-1.962 1.34-2.499m-.576 4.5a3 3 0 0 1-.764-2V37c0-.768.29-1.468.764-1.999m19.472-5c.475-.53.764-1.232.764-2a3 3 0 0 0 3-3v8a3 3 0 0 0-3-3zm-2.407 6H33a3 3 0 0 0 3-3v7a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2v-2.999A3 3 0 0 0 15 40h12a3 3 0 0 0 2.83-4m-2.826-2H33a1 1 0 1 0 0-2H15a1 1 0 1 0 0 2h12.003M38 15v25a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h14zM28 7l7 8h-6a1 1 0 0 1-1-1zm-5.75 17h-4.5L20 18.6zm1.827 4.385v-.002zM15 36a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2z" clipRule="evenodd"></path>
                                </g>
                            </svg>}
        </>
    )
}

export default SectionIcon
