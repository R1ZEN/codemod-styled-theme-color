const theme = {
    palette: {
        /**
         * first is the lightest and last is the darkest
         * values: 0-4
         */
        grey: ['#F4F5F7', '#E9EBF0', '#E2E4EB', '#D0D5D9', '#637381', '#212B36'],
        /**
         * first is the lightest and last is the darkest
         * values: 0-2
         */
        purple: ['#F0EDFF', '#e0dafd', '#6554C0'],
        red: '#EB5757',
        orange: '#FF8900',
        green: '#28C313',
        /**
         * first is the lightest and last is the darkest
         * values: 0-2
         */
        peach: ['#f3bbc2', '#f2bac1', '#efb6bc'],
    },

    defaultTextColor: '#212B36',
    border: '1px solid #E9EBF0',
    titleColor: '#212B36',
    primaryColor: '#6554C0',
    linkColor: '#6554C0',
    hintColor: '#637381',
    borderRadius: '6px',
    introColor: '#47C1BF',
    borderColor: '#EAECEF',
    backgroundHintColor: '#F2F6FB',
    darkGray: '#F2F6FB',
    silver: '#637381',
    lowSilver: '#E9EBF0',
    grinEditor: {
        toolbarColor: '#323845',
        placeholderColor: '#B2B5B9',
        bgAttachSuccess: '#F0EDFF',
        bgAttachProcess: '#E9EBF0',
        bgAttachFailed: '#FBDDDD',
        colorAttachSuccess: '#6554C0',
        colorAttachProcess: '#637381',
        colorAttachFailed: '#EB5757',
    },
    cards: {
        bgUpload: '#F5F6FB',
    },
    errorColor: '#EB5757',

    typography: {
        headers: ['2rem', '1.5rem', '1.25rem', '1.1rem', '1rem', '0.81rem'],
    },

    animation: {
        easing: {
            fastOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },
};

module.exports = { theme };
