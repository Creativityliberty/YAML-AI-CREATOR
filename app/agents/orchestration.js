import { Swarm } from 'swarm';
import { MetadataAgent } from './MetadataAgent';
import { FileAgent } from './FileAgent';
import { YamlBuilderAgent } from './YamlBuilderAgent';

const client = new Swarm();

export const orchestrateYAML = async (messages) => {
    const metadataResponse = await client.run({
        agent: MetadataAgent,
        messages: [{ role: "user", content: "Analyze project metadata." }]
    });

    const fileStructureResponse = await client.run({
        agent: FileAgent,
        messages: [{ role: "user", content: "Extract file structure from project." }]
    });

    const yamlResponse = await client.run({
        agent: YamlBuilderAgent,
        messages: [{ role: "user", content: "Generate YAML file." }]
    });

    console.log('Metadata:', metadataResponse);
    console.log('File Structure:', fileStructureResponse);
    console.log('Generated YAML:', yamlResponse);

    return yamlResponse;
}
