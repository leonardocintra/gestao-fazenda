from django.db import models


class TipoAtividade(models.Model):
    descricao = models.CharField(
        max_length=50, unique=True, verbose_name='Descrição da Atividade')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Data de Criação')
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name='Última Atualização')

    def __str__(self):
        return self.descricao

    class Meta:
        verbose_name_plural = 'Tipos de Atividade'
        db_table = 'tipo_atividade'