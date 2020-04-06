const supportedTools = ['ArrowAnnotate', 'Angle', 'Bidirectional', 'CircleRoi', 'CobbAngle', 'EllipticalRoi', 'FreehandRoi', 'Length', 'Probe', 'RectangleRoi', 'TextMarker'];

export const isToolSupported = (toolName) => supportedTools.indexOf(toolName) > -1;
