import React, { forwardRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'

const CustomerTableSearch = forwardRef((props, ref) => {

	const { onInputChange } = props

	const debounceFn = debounce(handleDebounceFn, 500)

	function handleDebounceFn(val) {
		onInputChange?.(val)
	}

	const handleInputChange = (e) => {
		debounceFn(e.target.value)
	}

	return (
		<Input
			ref={ref}
			className="w-40 max-w-md md:w-52 bg-[#F3F6F9]" 
			size="sm"
			placeholder={props?.placeholder?props?.placeholder:"Search"}
			prefix={<HiOutlineSearch className="text-lg" />} 
			onChange={handleInputChange}
		/>
	)
})

export default CustomerTableSearch
