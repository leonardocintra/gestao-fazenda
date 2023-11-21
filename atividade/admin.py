from django.contrib import admin
from .models import TipoAtividade


class TipoAtividadeAdmin(admin.ModelAdmin):
    list_display = ('descricao', 'created_at', 'updated_at')
    search_fields = ('descricao',)
    readonly_fields = ('created_at', 'updated_at')


admin.site.register(TipoAtividade, TipoAtividadeAdmin)