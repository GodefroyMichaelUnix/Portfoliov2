-- Add visual assets to the JSON skill modules used by the Skills page.
-- The application keeps the field optional so a skill can still render with initials if an asset is unavailable.

update public.skill_categories
set skills = case id
  when 'automation-workflows' then '[
    {"name":"Python (Scripting & Automation)","tags":["Requests","Pandas","Pydantic"],"useCase":"Scripts, manipulation de données.","levelBadge":"Avancé","imageUrl":"https://cdn.simpleicons.org/python"},
    {"name":"n8n & Make","tags":["Webhooks","OAuth2","Custom Code"],"useCase":"Conception de flux.","levelBadge":"Expert","imageUrl":"https://cdn.simpleicons.org/n8n"},
    {"name":"APIs RESTful","tags":["JSON","Auth","Rate Limiting"],"useCase":"Interconnexion de systèmes.","levelBadge":"Avancé","imageUrl":"https://cdn.simpleicons.org/postman"}
  ]'::jsonb
  when 'ai-agents' then '[
    {"name":"LLM Orchestration","tags":["Function Calling","State Machines"],"useCase":"Agents autonomes.","levelBadge":"Production","imageUrl":"https://cdn.simpleicons.org/openai"},
    {"name":"Prompt Engineering","tags":["JSON Schema","Guardrails"],"useCase":"Déterminisme LLM.","levelBadge":"Avancé","imageUrl":"https://cdn.simpleicons.org/anthropic"},
    {"name":"RAG","tags":["Embeddings","Vector DB"],"useCase":"Indexation & Recherche.","levelBadge":"Avancé","imageUrl":"https://cdn.simpleicons.org/supabase"}
  ]'::jsonb
  when 'data-infra' then '[
    {"name":"PostgreSQL","tags":["SQL","Indexes"],"useCase":"Modélisation & requêtes.","levelBadge":"Avancé","imageUrl":"https://cdn.simpleicons.org/postgresql"},
    {"name":"Linux & Bash","tags":["Systemd","SSH"],"useCase":"Administration & cron.","levelBadge":"Solide","imageUrl":"https://cdn.simpleicons.org/linux"},
    {"name":"Git & CI/CD","tags":["GitHub","Pipelines"],"useCase":"Versioning et déploiement.","levelBadge":"Standard","imageUrl":"https://cdn.simpleicons.org/github"}
  ]'::jsonb
  else skills
end
where id in ('automation-workflows','ai-agents','data-infra');
