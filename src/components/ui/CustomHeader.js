import CustomButton from "@/components/ui/CustomButton";

export default function CustomHeader(props) {
  return (
    <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-white/10">
      <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="mt-2 ml-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {props.label}
          </h2>
        </div>
        <div className="mt-2 ml-4 shrink-0">
          {props.button.isVisible && (
            <CustomButton
              onClick={props.button.onClick}
              label={props.button.label}
            />
          )}
        </div>
      </div>
    </div>
  );
}
