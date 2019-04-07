import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../../ui/components/uploader'
import ProgressBar from '../../ui/components/progressbar'
import PhotoGallery from '../../ui/components/photoGallery'

import './app.scss'

const Uploads = ({uploads, actions}) => {
	const pendingFiles = uploads.files.filter(({progress}) => progress && progress <= 100)
	const completedFiles = uploads.files.filter(({progress}) => !progress)

	return <div class="wrapper">
	  <header class="box header"> Header </header>
		<aside class="box sidebar">
	  {/* do not delete this uploader component */}
		<Uploader upload={actions.upload} />
		</aside>
    <article class="box content">
		<progress value="20" max="100">20%</progress>
		<ProgressBar inProgress={pendingFiles}/>

    <PhotoGallery completedFiles={completedFiles}/>
		</article>
		<footer class="box footer"> Footer </footer>
	</div>
}

const statusPropType = PropTypes.shape({
	status: PropTypes.oneOf([`init`, `pending`, `success`, `failure`]).isRequired,
	message: PropTypes.string.isRequired,
})

Uploads.propTypes = {
	uploads: PropTypes.shape({
		files: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			name: PropTypes.string.isRequired,
			progress: PropTypes.number,
			url: PropTypes.string,
			error: PropTypes.string,
		})).isRequired,
		update: statusPropType.isRequired,
		delete: statusPropType.isRequired,
		share: statusPropType.isRequired,
	}).isRequired,
	actions: PropTypes.object.isRequired,
}

export default Uploads
