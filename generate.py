#!/usr/bin/python3

import jinja2

models = [
{
    "name": "test",
    "description": "test long.",
    "methods": [{
            "type": "subscribe",
            "topic": "application/applicationID/node/devEUI/tx",
            "topic_members": [
                    "applicationID",
                    "devEUI"
                ]
        },
        {
            "type": "publish",
            "topic": "application/applicationID/node/devEUI/tx",
            "topic_members": [
                    "applicationID",
                    "devEUI"
                ],
            "required_fields": [
                    "luminosity",
                    "color"
                ],
            "optional_fields": [
                    "period",
                    "state_on_poweron"
                ]
        }]
}
]

template_loader = jinja2.FileSystemLoader('./')
template_env = jinja2.Environment(loader=template_loader)
template = template_env.get_template('base.html')
index_generated = template.render(models=models)
print(index_generated)
