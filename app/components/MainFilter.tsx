import { Combobox, Button } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx'
import { useState } from 'react'

export default function CarFilterCombobox() {
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 10
  const YEARS = Array.from({ length: currentYear - startYear + 1 }, (_, i) => (currentYear - i).toString()) // descending

  const BRANDS = ["All Brands",'Hyundai', 'Kia', 'Genesis', 'SsangYong', 'Daewoo']
  const MODELS = ['All Models', 'Model A', 'Model B', 'Model C', 'Model D', 'Model E', 'Model F', 'Model G', 'Model H', 'Model I', 'Model J']
  const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid']
  const MILEAGES = [
    '0 km',
    '1,000 km',
    '10,000 km',
    '30,000 km',
    '50,000 km',
    '100,000 km',
    '150,000 km',
    '200,000 km',
    '250,000 km',
    '300,000 km'
  ]
  const PRICES = [
    'Under 5,000',
    'Under 10,000',
    'Under 15,000',
    'Under 20,000',
    'Under 30,000'
  ]

  const [brandQuery, setBrandQuery] = useState('')
  const [modelQuery, setModelQuery] = useState('')
  const [fuelQuery, setFuelQuery] = useState('')
  const [yearMinQuery, setYearMinQuery] = useState('')
  const [yearMaxQuery, setYearMaxQuery] = useState('')
  const [mileageMinQuery, setMileageMinQuery] = useState('')
  const [mileageMaxQuery, setMileageMaxQuery] = useState('')
  const [priceQuery, setPriceQuery] = useState('')

  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0])
  const [selectedModel, setSelectedModel] = useState(MODELS[0])
  const [selectedFuel, setSelectedFuel] = useState(FUEL_TYPES[0])
  const [yearMin, setYearMin] = useState(YEARS[YEARS.length - 1])
  const [yearMax, setYearMax] = useState(YEARS[0])
  const [mileageMin, setMileageMin] = useState(MILEAGES[0])
  const [mileageMax, setMileageMax] = useState(MILEAGES[MILEAGES.length - 1])
  const [selectedPrice, setSelectedPrice] = useState(PRICES[0])

  const filterOptions = (options: string[], query: string) =>
    query === ''
      ? options
      : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))

  const renderCombobox = (
    label: string,
    options: string[],
    selected: string,
    setSelected: any,
    query: string,
    setQuery: any,
    disabled = false,
    readOnly = false,
    placeholder = label
  ) => (
    <Combobox
      value={selected}
      onChange={setSelected}
      onClose={() => setQuery('')}
      disabled={disabled}
      className={clsx('w-full scrollbar-hide', disabled && 'opacity-50 cursor-not-allowed')}
    >
      <div className="relative">
        <Combobox.Input
          readOnly={readOnly}
          className={clsx(
            'w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 scrollbar-hide',
            disabled && 'bg-gray-600'
          )}
          displayValue={() => selected}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 scrollbar-hide">
          <ChevronDownIcon className="h-5 w-5 text-white/60" />
        </Combobox.Button>
        {options.length > 0 && (
          <Combobox.Options
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 text-white shadow-lg z-[100] scrollbar-hide"
            onWheel={(e) => e.stopPropagation()}
          >
            {options.map((option) => (
              <Combobox.Option
                key={option}
                value={option}
                className={({ active, selected }) =>
                  clsx(
                    'cursor-default select-none px-4 py-2 text-sm',
                    active ? 'bg-gray-600' : '',
                    selected ? 'font-semibold text-blue-400' : 'text-white'
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selected && <CheckIcon className="h-4 w-4 text-blue-400" />}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )

  const navigate = useNavigate();

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (selectedBrand && selectedBrand !== 'All Brands') query.append('brand', selectedBrand);
    if (selectedModel && selectedModel !== 'All Models') query.append('model', selectedModel);
    if (selectedFuel && selectedFuel !== 'All') query.append('fuel', selectedFuel);
    if (yearMin) query.append('yearMin', yearMin);
    if (yearMax) query.append('yearMax', yearMax);
    if (mileageMin) query.append('mileageMin', mileageMin);
    if (mileageMax) query.append('mileageMax', mileageMax);
    if (selectedPrice && selectedPrice !== 'All') query.append('price', selectedPrice);

    navigate(`/cars?${query.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl px-4">
      <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col gap-4">
        
        {/* Line 1: Brand (initially selected, placeholder empty) */}
        {renderCombobox(
          'Brand',
          filterOptions(BRANDS, brandQuery),
          selectedBrand,
          setSelectedBrand,
          brandQuery,
          setBrandQuery,
          false,
          false,
          ''
        )}

        {/* Line 2: Model + Fuel (disabled until brand selected) */}
        <div className="flex flex-col md:flex-row gap-4">
          {renderCombobox(
            'Model',
            filterOptions(MODELS, modelQuery),
            selectedModel,
            setSelectedModel,
            modelQuery,
            setModelQuery,
            !selectedBrand
          )}
          {renderCombobox(
            'Fuel Type',
            filterOptions(FUEL_TYPES, fuelQuery),
            selectedFuel,
            setSelectedFuel,
            fuelQuery,
            setFuelQuery,
            !selectedBrand
          )}
        </div>

        {/* Line 3: Year Min + Max (non-writable dropdowns) */}
        <div className="flex flex-col md:flex-row gap-4">
          {renderCombobox('Year Min', filterOptions(YEARS, yearMinQuery), yearMin, setYearMin, yearMinQuery, setYearMinQuery, false, true)}
          {renderCombobox('Year Max', filterOptions(YEARS, yearMaxQuery), yearMax, setYearMax, yearMaxQuery, setYearMaxQuery, false, true)}
        </div>

        {/* Line 4: Mileage Min + Max (non-writable dropdowns) */}
        <div className="flex flex-col md:flex-row gap-4">
          {renderCombobox('Mileage Min', filterOptions(MILEAGES, mileageMinQuery), mileageMin, setMileageMin, mileageMinQuery, setMileageMinQuery, false, true)}
          {renderCombobox('Mileage Max', filterOptions(MILEAGES, mileageMaxQuery), mileageMax, setMileageMax, mileageMaxQuery, setMileageMaxQuery, false, true)}
        </div>

        {/* Line 5: Price + Search (symmetrical) */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            {renderCombobox('Price', filterOptions(PRICES, priceQuery), selectedPrice, setSelectedPrice, priceQuery, setPriceQuery, false, true)}
          </div>
          <div className="flex-1">
            <Button
              onClick={handleSearch}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
