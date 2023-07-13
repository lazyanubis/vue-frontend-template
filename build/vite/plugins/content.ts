import pluginContent from '@originjs/vite-plugin-content';
import { PluginOption } from 'vite';

export function viteContent(): PluginOption[] {
    return [pluginContent()];
}
