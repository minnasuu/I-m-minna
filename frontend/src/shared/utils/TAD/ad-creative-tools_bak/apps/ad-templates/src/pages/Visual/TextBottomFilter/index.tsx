
const TextBottomFilter = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
        <div className="text-s h-full p-4 overflow-y-auto color-gray-400" style={{scrollbarWidth: 'none'}}>
        Clicking the input label should focus the input field
        Inputs should be wrapped with a {`<form>`} to submit by pressing Enter
        Inputs should have an appropriate type like password, email, etc
        Inputs should disable spellcheck and autocomplete attributes most of the time
        Inputs should leverage HTML form validation by using the required attribute when appropriate
        Input prefix and suffix decorations, such as icons, should be absolutely positioned on top of the text input with padding, not next to it, and trigger focus on the input
        Toggles should immediately take effect, not require confirmation
        Buttons should be disabled after submission to avoid duplicate network requests
        Interactive elements should disable user-select for inner content
        Decorative elements (glows, gradients) should disable pointer-events to not hijack events
        Interactive elements in a vertical or horizontal list should have no dead areas between each element, instead, increase their padding
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 rounded-b-[15px] pointer-events-none"
        style={{
            background: 'linear-gradient(to bottom,transparent,#fcfcfc)',
            maskImage: 'linear-gradient(to top,#fcfcfc 25%,transparent)',
            backdropFilter: 'blur(1px)',
        }}
        ></div>
    </div>
  )
}

export default TextBottomFilter