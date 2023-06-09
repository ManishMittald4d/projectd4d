import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePaymentMethodData } from 'store/readability/readabilitySlice'
import {
	closeDeletePaymentMethodDialog,
} from 'store/readability/readabilityStateSlice'
import cloneDeep from 'lodash/cloneDeep'
import { ConfirmDialog } from 'components/shared'

const DeletePaymentMethod = () => {

	const dispatch = useDispatch()
	const data = useSelector((state) => state?.readability?.paymentMethodData)
	const dialogOpen = useSelector((state) => state?.readability?.deletePaymentMethodDialog)
	const selectedCard = useSelector((state) => state?.readability?.selectedCard)

	const onDelete = () => {
		let newData = cloneDeep(data)
		newData = newData.filter(payment => payment.last4Number !== selectedCard.last4Number)
		dispatch(closeDeletePaymentMethodDialog())
		dispatch(updatePaymentMethodData(newData))
	}

	const onDialogClose = () => {
		dispatch(closeDeletePaymentMethodDialog())
	}

	return (
		<ConfirmDialog
			isOpen={dialogOpen}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
			type="danger"
			title="Remove payment method"
			onCancel={onDialogClose}
			onConfirm={onDelete}
			confirmButtonColor="red-600"
		>
			<p> Are you sure you want to remove this payment method? </p>
		</ConfirmDialog>
	)
}

export default DeletePaymentMethod
