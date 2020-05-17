export const data_plotting = {
    histogram1d: {
        heading: 'Histogram 1 D',
        p: `
                This is the histogram in one dimension for the FCS file
            `
    },
    histogram2d: {
        heading: 'Histogram 2 D',
        p: `This is the histogram in two dimensions for the FCS file. It is plotting using the provided two channels from the
                select lists.
            `
    },
    compensation: {
        heading: 'Compensation',
        p: `This is obtained by interchanging channels data and multiplied
                (by 0.15 for channel 1, by 0.32 form channel 2) and subtracted from respective channels.
            `
    },
    custom_transformation: {
        heading: 'Custom Transformation',
        p: `
                This is custom transformation plot. The custom transformation is obtained by taking the log of each channel.
            `
    },
    scatter: {
        heading: 'Scatter plot',
        p: `
                This is scatter plot for the two channels selected.
            `
    },
    threshold_gate: {
        heading: 'Threshold Gate',
        p: `
                This is threshold gate plot. This is obtained by applying x and y gating on axes.
            `
    }
}
export const data_ml = {
    histogram: {
        heading: 'Histogram',
        p: `
                The histogram of the two tubes which were treated with two different concentrations of Doxycycline.
            `
    },
    gausian: {
        heading: 'Gausian plot',
        p: `
                The Gausian Machine learning model is used to separate the data into two/more populations. It uses a default
                estimation method for parameters.
            `
    },
    gausian_table: {
        heading: 'Gausian Table',
        p: `
                We applied GaussianMixtureModelOp method to add new piece of meta data to each event in the data set. The
                events are labelled as Gauss_1 and Gauss_2 in the table.
            `
    },
    gausian_posterior: {
        heading: 'Gausian Posterior',
        p: `
                Sometimes the mixtures are close enough to be separated and therefore we filtered the events by applying posterior probability.
            `
    },
    gausian_posterior_table: {
        heading: 'Gausian Posterior Table',
        p: `
                The table shows the posterior probability of each event, marked as Gauss_1_ posterior and Gauss_2_posterior.
            `
    },
    gausian_filtered_low_posterior: {
        heading: 'Gausian filtered low posterior',
        p: `
                The is the plot after filtering out the low posterior probability of each event.
            `
    },
    gausian_mixture_model_two_channels: {
        heading: 'Gausian mixture model two channels',
        p: `
                The GaussianMixtureOp can work with multidimensions of channels. This is a plot of two channels workflow.
            `
    },
    k_means: {
        heading: 'K Means',
        p: `
                The plot shows the K Means in the Gaussian mixture model. The centroids are marked with a star symbol.
            `
    },
    k_means2: {
        heading: 'K Means 3 clusters',
        p: `
                The plot shows the K Means in the Gaussian mixture model. The centroids are marked with a star symbol.
                The shows a more clear clustering by taking the log of the channels instead.
            `
    },
}
